export type Shoot = {
  index: number;
  startAt: number;

  message: string | null;
  delayMessage: number | string;

  audio: string | null;
  delayAudio: number | string;

  image: {
    caption: string;
    url: string;
  } | null;

  video: {
    caption: string;
    url: string;
  } | null;

  doc: {
    filename: string;
    url: string;
  } | null;
};
