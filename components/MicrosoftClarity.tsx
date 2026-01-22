'use client'

import Script from 'next/script'

const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID

export default function MicrosoftClarity() {
  if (!CLARITY_PROJECT_ID) {
    return null
  }

  return (
    <Script id="microsoft-clarity" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
      `}
    </Script>
  )
}

// Helper function to tag sessions with custom data
export function tagClaritySession(key: string, value: string) {
  if (typeof window !== 'undefined' && (window as any).clarity) {
    (window as any).clarity('set', key, value)
  }
}

// Helper function to identify users (optional - for logged in users)
export function identifyClarityUser(userId: string, sessionId?: string, pageId?: string) {
  if (typeof window !== 'undefined' && (window as any).clarity) {
    (window as any).clarity('identify', userId, sessionId, pageId)
  }
}
