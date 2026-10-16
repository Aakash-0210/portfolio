export const downloadResume = () => {
  const link = document.createElement('a');
  link.href = `${import.meta.env.BASE_URL}AAKASH_RESUME.pdf`;
  link.download = 'Aakash-Prajapati-Resume.pdf';
  document.body.appendChild(link);
  link.click();
  link.remove();
};
