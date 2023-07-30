export type Shoot = {
  index: number;
  startAt: number;

  message: string | null;
  delayMessage: number;

  audio: string | null;
  delayAudio: number;

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
