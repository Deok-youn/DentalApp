import { Suspense } from 'react';
import { EtymologyClient } from './EtymologyClient';

export const metadata = {
  title: '용어 암기 팁 | Dental Instruments',
  description: '치과 기구 용어 암기 팁 — 어원을 알면 오타도 줄고 더 오래 기억됩니다',
};

export default function EtymologyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--background)' }}>
        <div className="text-center space-y-2">
          <p className="text-2xl">📖</p>
          <p className="text-slate-400 text-sm">어원 사전 불러오는 중...</p>
        </div>
      </div>
    }>
      <EtymologyClient />
    </Suspense>
  );
}
