export default function genConnectionMetadata(options?: { restrictNetwork?: boolean }): {
  token: string;
  gurl: string;
  conmanURL: string;
};
