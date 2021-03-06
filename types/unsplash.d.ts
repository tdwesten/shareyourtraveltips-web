export type Photo = {
  id: string;
  width: number;
  height: number;
  urls: { large: string; regular: string; raw: string; small: string };
  links: { download_location: string };
  color: string | null;
  user: {
    username: string;
    first_name: string;
    last_name: string;
  };
};
