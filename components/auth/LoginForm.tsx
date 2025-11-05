"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import InputWithLabel from "@/components/ui/input-with-label";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "@/lib/axios"; // <-- existing
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email address est requis"),
      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Mot de passe est requis"),
    }),
    onSubmit: async (values, { setErrors }) => {
      try {
        const response = await api.post("/auth/login", {
          email: values.email,
          password: values.password,
        });

        if (response.status === 200) {
          if (typeof window !== "undefined") {
            localStorage.setItem("accessToken", response.data.token);
          }
          router.push("/");
        } else {
          setErrors({ email: "Adresse e-mail ou mot de passe invalide." });
        }
      } catch (error: any) {
        console.error(error);

        // Prefer structured field errors from API: { error: { email: "..." } }
        const fieldErrors = error?.response?.data?.error;
        if (fieldErrors && typeof fieldErrors === "object") {
          const mapped: Record<string, string> = {};
          for (const key in fieldErrors) {
            const val = fieldErrors[key];
            mapped[key] = Array.isArray(val) ? val.join(" ") : String(val);
          }
          setErrors(mapped);
          return;
        }

        // Fallback to message or generic text
        const message =
          error?.response?.data?.message ||
          "Adresse e-mail ou mot de passe invalide.";
        setErrors({ email: message });
      }
    },
  });

  async function signIn(provider: string) {
    if (typeof window === "undefined") return;

    // Prefer next-auth if it's available in the project
    try {
      const nextAuth = await import("next-auth/react");
      if (typeof nextAuth.signIn === "function") {
        // use callbackUrl so user is returned to home after auth
        await nextAuth.signIn(provider, { callbackUrl: "/" });
        return;
      }
    } catch {
      // ignore and fall back to popup redirect
    }

    // Fallback: open provider sign-in in a popup window.
    // NextAuth's default provider sign-in endpoint is /api/auth/signin/[provider].
    // Adjust the path if your backend uses a different route.
    const callback = window.location.origin + "/";
    const url = `/api/auth/signin/${encodeURIComponent(provider)}?callbackUrl=${encodeURIComponent(callback)}`;

    const width = 600;
    const height = 700;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    const popup = window.open(
      url,
      "oauth_popup",
      `width=${width},height=${height},left=${left},top=${top},resizable,scrollbars=yes,status=1`
    );

    if (!popup) {
      // popup blocked; fall back to full redirect
      window.location.href = url;
      return;
    }

    // Poll the popup; when it closes, reload to pick up session/token changes.
    const poll = setInterval(() => {
      if (popup.closed) {
        clearInterval(poll);
        // Optionally: try to read token from storage/session here.
        window.location.reload();
      }
    }, 500);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-transparent border-0 shadow-none">
        <CardHeader>
          <div className="flex flex-col py-5 ">
            <h2 className="text-3xl font-semibold">Welcome to InTalks ! 👋🏻</h2>
            <p>Please sign-in to your account and start the adventure</p>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-6">
              <InputWithLabel
                label="Email"
                placeHolder="m@example.com"
                name="email"
                type="email"
                className=""
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email}
              />
              <InputWithLabel
                label="Password"
                placeHolder="Password"
                name="password"
                type="password"
                className=""
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.errors.password}
              />
              <div className="flex justify-end">
                <Link
                  href={"/forgot-password"}
                  className="group text-xs text-end text-main flex justify-end items-center gap-3.5  hover:text-white/80 transition-colors duration-300"
                >
                  <span className="group-hover:text-main relative pb-1 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-px after:bg-main group-hover:after:w-full after:transition-all after:duration-300">
                    Forgot password?
                  </span>
                </Link>
              </div>

              <Button
                type="submit"
                className="bg-main h-auto grow hover:bg-transparent hover:text-main border border-main transition-all ease-in-out duration-300"
              >
                Login
                <ArrowRight />
              </Button>
            </div>
          </form>

          <div className="flex items-center gap-2 text-gray-600 text-xs">
            <span className="flex-1 bg-gray-400 h-[0.5px]"></span>
            Or
            <span className="flex-1 bg-gray-400 rounded-xl h-[0.5px]"></span>
          </div>
          <Button
            onClick={() => {
              signIn("google");
            }}
            className="w-full bg-transparent border text-black border-gray-200 hover:bg-gray-200/40"
          >
            <Image src={"/auth/google.png"} alt="Logo" width={20} height={20} />
            Login with Google
          </Button>
        </CardContent>
      </Card>
      <div className="text-sm text-center flex justify-center items-center gap-1">
        {` Don't have an account ?`}
        <Link
          href={"/register"}
          className="group text-end text-main flex justify-end items-center gap-3.5  hover:text-main/80 transition-colors duration-300"
        >
          {" "}
          Sign up
        </Link>
      </div>
      <div className="text-balance text-center text-xs text-gray-900">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
