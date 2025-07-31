
import React, { useMemo } from "react";

export default function MessageTextBody({ body }: { body: string }) {
  const transformedBody = useMemo(() => {
    const urlRegex = /((https?:\/\/|www\.)[^\s]+)/gi;

    let isBodyIsUrl = false;

    const transformedBody = body.replace(urlRegex, (url) => {
      const href = url.startsWith("http") ? url : `https://${url}`;
      isBodyIsUrl = true;
      return `<a class="text-primary" href="${href}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });

    if (isBodyIsUrl) {
      return (
        <p
          className="text-foreground text-sm font-light whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: transformedBody }}
        ></p>
      );
    }

    return (
      <p className="text-foreground text-sm font-light whitespace-pre-wrap">
        {body}
      </p>
    );
  }, [body]);

  return <>{transformedBody}</>;
}
