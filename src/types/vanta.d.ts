declare module 'vanta/dist/vanta.net.min' {
  const VANTA_NET: (options: Record<string, unknown>) => { destroy: () => void };
  export default VANTA_NET;
}
