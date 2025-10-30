import React from 'react';
import { useTranslations } from 'next-intl';

export default function AllDataTable({ data }: { data: any[] }) {
  const t = useTranslations();
  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full bg-white border rounded-xl text-sm">
        <thead>
          <tr className="bg-gray-50 text-gray-700">
            <th className="py-2 px-3 text-left font-semibold whitespace-nowrap">{t('audience.table.social_media')}</th>
            <th className="py-2 px-3 text-left font-semibold whitespace-nowrap">{t('audience.table.score')}</th>
            <th className="py-2 px-3 text-right font-semibold whitespace-nowrap">{t('audience.table.followers')}</th>
            <th className="py-2 px-3 text-right font-semibold whitespace-nowrap">{t('audience.table.growth')}</th>
            <th className="py-2 px-3 text-right font-semibold whitespace-nowrap">{t('audience.table.last_activity')}</th>
            <th className="py-2 px-3 text-right font-semibold whitespace-nowrap">{t('audience.table.activity')}</th>
            <th className="py-2 px-3 text-right font-semibold whitespace-nowrap">{t('audience.table.eng_rate')}</th>
            <th className="py-2 px-3 text-right font-semibold whitespace-nowrap">{t('audience.table.avg_eng')}</th>
            <th className="py-2 px-3 text-right font-semibold whitespace-nowrap">{t('audience.table.avg_views')}</th>
            <th className="py-2 px-3 text-right font-semibold whitespace-nowrap">{t('audience.table.posting_habits')}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-b hover:bg-gray-50 transition text-sm">
              <td className="py-2 px-3">
                <div className="flex items-center gap-3 whitespace-nowrap">
                  {/* Social media logo in square placeholder */}
                  <div className="w-8 h-8 flex items-center justify-center bg-gray-100 border border-gray-200 rounded-md overflow-hidden shrink-0">
                    <img src={row.icon} alt="logo" className="w-6 h-6 object-contain" />
                  </div>
                  {/* Profile picture in rounded placeholder */}
                  {row.userAvatar && (
                    <div className="w-8 h-8 flex items-center justify-center bg-gray-100 border border-gray-200 rounded-full overflow-hidden shrink-0">
                      <img src={row.userAvatar} alt={row.name} className="w-7 h-7 rounded-full object-cover" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <span className="block">{row.name}</span>
                    {row.username && (
                      <span className="block text-gray-500 text-sm">@{row.username}</span>
                    )}
                  </div>
                </div>
              </td>
              <td className="py-2 px-3 text-left whitespace-nowrap">{row.score}</td>
              <td className="py-2 px-3 text-right whitespace-nowrap">{row.followers}</td>
              <td
                className={`py-2 px-3 text-right whitespace-nowrap ${row.growth && row.growth.trim().startsWith('-')
                  ? 'text-red-500'
                  : row.growth && row.growth.trim().startsWith('+')
                  ? 'text-green-600'
                  : ''}`}
              >
                {row.growth}
              </td>
              <td className="py-2 px-3 text-right whitespace-nowrap">{row.lastActivity}</td>
              <td className="py-2 px-3 text-right whitespace-nowrap">{row.activity}</td>
              <td className="py-2 px-3 text-right text-green-600 whitespace-nowrap">{row.engRate}</td>
              <td className="py-2 px-3 text-right text-green-600 whitespace-nowrap">{row.avgEng}</td>
              <td className="py-2 px-3 text-right text-green-600 whitespace-nowrap">{row.avgViews}</td>
              <td className="py-2 px-3 text-right whitespace-nowrap">{row.postingHabits}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}