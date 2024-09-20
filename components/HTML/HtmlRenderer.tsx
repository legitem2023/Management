import React from 'react';
import { replaceOembedWithIframe } from 'utils/extraFetch';

interface Props {
  htmlContent: string;
}

const HtmlRenderer: React.FC<Props> = ({ htmlContent }) => {
  const data = replaceOembedWithIframe(htmlContent);
  return (
    <div dangerouslySetInnerHTML={{ __html: data }} />
  );
};

export default HtmlRenderer;
