"use client";

import React, { useState } from "react";

// This page is repurposed to be the "Share your API" / Developer Portal
// for clients to integrate with THIS app (not to integrate other APIs).
export default function ApiIntegrationsPage() {
    const [apiKey, setApiKey] = useState<string | null>(null);

    function generateApiKey() {
        // Minimal example key generator for UI/demo purposes only.
        const key = `sk_${Math.random().toString(36).slice(2, 18)}`;
        setApiKey(key);
    }

    function revokeApiKey() {
        setApiKey(null);
    }

    // We removed the endpoints list. This page now focuses only on letting
    // clients download the API documentation as a PDF.

    // Minimal PDF content (ASCII PDF structure). For demo purposes only.
    // In production provide a real PDF file from the server (e.g., /public/docs/api-docs.pdf)
    const pdfContent = `%PDF-1.1
    1 0 obj
    << /Type /Catalog /Pages 2 0 R >>
    endobj
    2 0 obj
    << /Type /Pages /Kids [3 0 R] /Count 1 >>
    endobj
    3 0 obj
    << /Type /Page /Parent 2 0 R /MediaBox [0 0 300 144] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
    endobj
    4 0 obj
    << /Length 44 >>
    stream
    BT
    /F1 18 Tf
    20 100 Td
    (API Documentation) Tj
    ET
    endstream
    endobj
    5 0 obj
    << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
    endobj
    xref
    0 6
    0000000000 65535 f 
    0000000010 00000 n 
    0000000061 00000 n 
    0000000116 00000 n 
    0000000223 00000 n 
    0000000292 00000 n 
    trailer
    << /Size 6 /Root 1 0 R >>
    startxref
    358
    %%EOF`;

    function downloadPdf() {
        const blob = new Blob([pdfContent], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "api-docs.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    }

    return (
        <main className="px-6 md:px-12 py-6">
            <header className="mb-6">
                <h1 className="text-2xl font-bold">Developer API (Share & Integrate)</h1>
                <p className="text-sm text-gray-500">Allow your clients to integrate your product into their CRM, Salesforce, or other systems.</p>
            </header>

            <section className="grid gap-6">
                <div className="border rounded-lg p-4 bg-white">
                    <h2 className="text-lg font-semibold mb-2">Getting started</h2>
                    <p className="text-sm text-gray-600 mb-3">Create an API key for a client, share documentation, and provide webhook callbacks for real-time events.</p>

                    <div className="mb-3">
                        <label className="block text-xs text-gray-500 mb-1">API Key</label>
                        <div className="flex items-center gap-3">
                            <input type="text" readOnly value={apiKey ?? "No key created"} className="flex-1 border rounded px-3 py-2 text-sm bg-gray-50" />
                            {apiKey ? (
                                <button onClick={revokeApiKey} className="px-3 py-2 border rounded text-sm">Revoke</button>
                            ) : (
                                <button onClick={generateApiKey} className="px-3 py-2 border rounded text-sm">Create Key</button>
                            )}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Tip: Provide this key to your client securely. For production, keys should be created server-side and stored encrypted.</p>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium">Authentication</h3>
                        <p className="text-xs text-gray-600">Clients should send the API key in the Authorization header:</p>
                        <pre className="bg-gray-100 rounded p-2 text-xs mt-2">Authorization: Bearer &lt;API_KEY&gt;</pre>
                    </div>
                </div>

                {/* Webhooks removed — this page focuses on API key, docs PDF and Swagger link */}
            </section>

            <section className="mt-6">
                <div className="border rounded-lg p-6 bg-white text-center">
                    <h2 className="text-lg font-semibold mb-3">Download API Documentation</h2>
                    <p className="text-sm text-gray-600 mb-4">Click the button below to download the official API documentation as a PDF.</p>
                    <div className="flex justify-center gap-3">
                        <button className="px-4 py-2 border rounded bg-blue-600 text-white" onClick={downloadPdf}>Download Docs (PDF)</button>
                        <a href="/docs/swagger" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border rounded bg-white text-blue-600 hover:bg-gray-50">Open Swagger UI</a>
                    </div>
                    <p className="text-xs text-gray-500 mt-3">Note: this is a demo PDF generated in the browser. For production, serve a real PDF from your server (e.g., /public/docs/api-docs.pdf).</p>
                </div>
            </section>
        </main>
    );
}
