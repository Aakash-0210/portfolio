export const createGmailComposeUrl = (
  to: string,
  subject?: string,
  body?: string
): string => {
  const params = new URLSearchParams({ view: 'cm', fs: '1', to });

  if (subject) params.set('su', subject);
  if (body) params.set('body', body);

  return `https://mail.google.com/mail/?${params.toString()}`;
};

export const createMailtoUrl = (
  to: string,
  subject?: string,
  body?: string
): string => {
  const params = new URLSearchParams();

  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);

  const query = params.toString();
  return `mailto:${to}${query ? `?${query}` : ''}`;
};
