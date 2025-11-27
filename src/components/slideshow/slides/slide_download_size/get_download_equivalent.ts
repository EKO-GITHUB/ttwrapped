const download_amounts: Record<number, string[]> = {
  0: [
    "That's not that much data at all.",
    "You could store that much data pretty easily.",
    "Haven't been watching much? That's about right.",
  ],
  1: [
    "That's about 500 smartphone photos at typical quality.",
    "That's roughly 250 MP3 songs at standard bitrate.",
    "That's equivalent to around 20 minutes of HD streaming video.",
    "That could hold about 15,000 emails without big attachments.",
    "Picture this as roughly 700 old 1.44 MB floppy disks.",
  ],
  2: [
    "That's enough for roughly 1,000 ebooks at about 2 MB each.",
    "Think of it as around 20 mid‑size mobile apps installed.",
    "That's equivalent to about 3 hours of HD video calls on Zoom.",
    "That would store close to 80 DSLR RAW photos at 25 MB each.",
    "That's roughly the data on about three recordable CDs.",
  ],
  3: [
    "That's about 1 hour of HD streaming on Netflix.",
    "That could hold roughly 900 Instagram posts with captions.",
    "That's equivalent to around 15,000 Word documents at 200 KB each.",
    "Picture this as close to 50 hours of podcast audio at standard quality.",
    "Think of it as the download size of a small indie game.",
  ],
  4: [
    "That's about 2,000 smartphone photos at typical size.",
    "That's roughly 1,000 MP3 songs you can play offline.",
    "That would store around 12 minutes of 4K smartphone video at 30 fps.",
    "That could hold about 40 average mobile apps.",
    "Think of it as just under the capacity of a single‑layer DVD.",
  ],
  5: [
    "That's enough for about 75,000 emails without heavy attachments.",
    "Picture this as roughly 150 hours of audiobook listening at 64 kbps.",
    "That would store around 200 high‑resolution RAW photos from a DSLR.",
    "Think of it as about 150 short TikTok or Reels downloads at 30 MB each.",
    "That could hold offline maps for roughly 20 large cities.",
  ],
  6: [
    "That's about 3,000 smartphone photos.",
    "That's equivalent to roughly 9 hours of HD Zoom calls.",
    "That could hold a big game update for a blockbuster title.",
    "Think of it as around 3,000 ebooks at 2 MB each.",
    "Picture this as close to 2,000 Instagram posts with images.",
  ],
  7: [
    "That's roughly 1,750 MP3 songs at 4 MB each.",
    "That would store a bit over 2 hours of 1080p streaming video.",
    "That's enough for about 70 average mobile apps.",
    "Picture this as roughly 35,000 Word documents at 200 KB each.",
    "Think of it as nearly 5,000 old floppy disks' worth of data.",
  ],
  8: [
    "That's about 20 minutes of crisp 4K video from a modern phone.",
    "That could hold roughly 1,600 high‑quality photos at 5 MB each.",
    "That's equivalent to about two modest indie games downloaded.",
    "Picture this as around 120,000 emails without big attachments.",
    "Think of it as just shy of a dual‑layer DVD's capacity.",
  ],
  9: [
    "That's roughly 180 hours of Spotify streaming at standard quality.",
    "That would store about 360 DSLR RAW photos at 25 MB each.",
    "That's about 3 hours of 1080p video saved offline.",
    "That could hold nearly 90 average mobile apps.",
    "Think of it as close to 6,000 Instagram photo posts at 1.5 MB each.",
  ],
  10: [
    "That's about 5,000 smartphone photos ready to share.",
    "That's equivalent to roughly 2,500 MP3 songs.",
    "That could hold just over two single‑layer DVDs' worth of data.",
    "Picture this as around 150,000 emails without large attachments.",
    "Think of it as approximately 16 hours of HD video calls.",
  ],
  12: [
    "That's roughly 30 minutes of 4K footage recorded on a smartphone.",
    "That would store about the install size of a medium‑sized PC game.",
    "That could hold around 6,000 ebooks at 2 MB each.",
    "Picture this as approximately 60,000 Word documents at 200 KB each.",
    "Think of it as nearly half the capacity of a single‑layer Blu‑ray disc.",
  ],
  14: [
    "That's about 280 hours of music streaming at standard quality.",
    "That's equivalent to roughly 4.5 hours of 1080p video saved offline.",
    "That could hold close to 140 average mobile apps.",
    "Picture this as around 4,500 Instagram photo posts at 3 MB each.",
    "Think of it as nearly 10,000 old floppy disks' worth of space.",
  ],
  16: [
    "That's about 8,000 smartphone photos.",
    "That's roughly 4,000 MP3 tracks queued up.",
    "That could hold around 240,000 emails without heavy attachments.",
    "Picture this as nearly 500 hours of audiobook listening at 64 kbps.",
    "Think of it as about two thirds of a single‑layer Blu‑ray disc's capacity.",
  ],
  18: [
    "That's roughly 45 minutes of 4K video capture on a modern phone.",
    "That would store around 90,000 Word documents at 200 KB each.",
    "That could hold about 180 typical mobile apps.",
    "Picture this as the download size of a sizable modern game.",
    "Think of it as about four single‑layer DVDs' worth of data.",
  ],
  20: [
    "That's about 10,000 smartphone photos at everyday quality.",
    "That's equivalent to roughly 6 to 7 hours of HD streaming video.",
    "That could hold around 300,000 emails without big attachments.",
    "Picture this as about 10,000 ebooks at 2 MB each.",
    "Think of it as nearly 30 recordable CDs' worth of data.",
  ],
  25: [
    "That's about the capacity of one single‑layer Blu‑ray disc.",
    "That's roughly 6,250 MP3 songs at 4 MB each.",
    "That could hold around an hour of 4K video footage.",
    "Picture this as roughly 8,000 Instagram photo posts at 3 MB apiece.",
    "Think of it as approximately 125,000 Word documents at 200 KB each.",
  ],
  30: [
    "That's about 10 hours of 1080p video saved offline.",
    "That's equivalent to roughly 15,000 ebooks at 2 MB each.",
    "That could hold the install size of a big modern game.",
    "Picture this as roughly 500 hours of podcast audio at standard quality.",
    "Think of it as about six single‑layer DVDs' worth of space.",
  ],
  35: [
    "That's about 17,500 smartphone photos.",
    "That's roughly 700 hours of music streaming at standard quality.",
    "That could hold around 350 average mobile apps.",
    "Picture this as around 5,250,000 emails without large attachments.",
    "Think of it as roughly 50 recordable CDs' worth of data.",
  ],
  40: [
    "That's equivalent to roughly 13 hours of HD video to watch offline.",
    "That could hold around 600,000 emails without hefty attachments.",
    "Picture this as about one and a half single‑layer Blu‑ray discs of data.",
    "That's about 20,000 ebooks at 2 MB each.",
    "Think of it as almost two days of continuous 1080p security‑camera footage at a moderate bitrate.",
  ],
  45: [
    "That's about 2 hours of 4K video recorded at high quality.",
    "That's roughly 450 average mobile apps installed.",
    "That could hold approximately 225,000 Word documents at 200 KB each.",
    "Picture this as a chunky multi‑gigabyte update for a blockbuster game, several times over.",
    "Think of it as about nine single‑layer DVDs' worth of storage.",
  ],
  50: [
    "That's about two single‑layer Blu‑ray discs full of data.",
    "That's roughly 25,000 smartphone photos.",
    "That could hold around 12,500 MP3 songs.",
    "Picture this as roughly 80 hours of HD video calls.",
    "Think of it as close to 16,000 Instagram posts at 3 MB each.",
  ],
  60: [
    "That's equivalent to about 20 hours of 1080p video saved offline.",
    "That could hold roughly 30,000 ebooks at 2 MB each.",
    "Picture this as around 900,000 emails without big attachments.",
    "That's enough for the install size of two or three large modern games.",
    "Think of it as about 85 recordable CDs' worth of data.",
  ],
  70: [
    "That's roughly 1,400 hours of music streaming at standard quality.",
    "That could hold about 35,000 smartphone photos.",
    "Picture this as nearly 3 hours of 4K video captured at high quality.",
    "That's equivalent to almost three single‑layer Blu‑ray discs of storage.",
    "Think of it as around 350,000 Word documents at 200 KB each.",
  ],
  80: [
    "That's about 26 hours of HD video to watch offline.",
    "That's roughly 800 average mobile apps.",
    "That could hold around 40,000 ebooks at 2 MB each.",
    "Picture this as close to 26,000 Instagram posts at 3 MB each.",
    "Think of it as about 17 single‑layer DVDs' worth of data.",
  ],
  90: [
    "That's about 45,000 smartphone photos.",
    "That's roughly 1,800 hours of Spotify listening at standard quality.",
    "That could hold a bit over four days of continuous 1080p security‑camera footage at a moderate bitrate.",
    "Picture this as about three and a half single‑layer Blu‑ray discs of storage.",
    "Think of it as approximately 1,350,000 emails without large attachments.",
  ],
  100: [
    "That's about the data footprint of one high‑coverage human genome sequence.",
    "That's roughly 33 hours of 1080p video ready to watch offline.",
    "That could hold the install size of a top‑tier modern game.",
    "Picture this as around 50,000 ebooks at 2 MB each.",
    "Think of it as close to 140 recordable CDs' worth of storage.",
  ],
  125: [
    "That's about 62,500 smartphone photos.",
    "That's roughly 5 hours of 4K video captured at a high bitrate.",
    "That could hold the equivalent of five single‑layer Blu‑ray discs.",
    "Picture this as nearly 2,000,000 emails without large attachments.",
    "Think of it as approximately 625,000 Word documents at 200 KB each.",
  ],
  150: [
    "That's about 50 hours of HD video saved offline.",
    "That's roughly 3,000 hours of music streaming at standard quality.",
    "That could hold around 1,500 average mobile apps.",
    "Picture this as about 32 single‑layer DVDs' worth of space.",
    "Think of it as approximately 75,000 ebooks at 2 MB each.",
  ],
  175: [
    "That's about 87,500 smartphone photos.",
    "That's roughly 7 hours of 4K video recording at high quality.",
    "That could hold the contents of seven single‑layer Blu‑ray discs.",
    "Picture this as around 2,600,000 emails without hefty attachments.",
    "Think of it as roughly 1,750 average mobile apps.",
  ],
  200: [
    "That's about the size of data for two high‑coverage human genome sequences.",
    "That's roughly 66 hours of 1080p video ready to watch offline.",
    "That could hold two blockbuster game installs with room to spare.",
    "Picture this as around 100,000 ebooks at 2 MB each.",
    "Think of it as close to ten days of continuous 1080p security‑camera footage at a moderate bitrate.",
  ],
  250: [
    "That's about 125,000 smartphone photos.",
    "That's roughly 10 hours of 4K video saved at high quality.",
    "That could hold the equivalent of ten single‑layer Blu‑ray discs.",
    "Picture this as nearly 3,750,000 emails without large attachments.",
    "Think of it as approximately 1,250,000 Word documents at 200 KB each.",
  ],
  300: [
    "That's about 100 hours of HD video you can keep offline.",
    "That's roughly 6,000 hours of music streaming at standard quality.",
    "That could hold around 3,000 average mobile apps.",
    "Picture this as about 64 single‑layer DVDs' worth of data.",
    "Think of it as nearly 150,000 ebooks at 2 MB each.",
  ],
  350: [
    "That's about 175,000 smartphone photos.",
    "That's roughly 14 hours of 4K video at a high bitrate.",
    "That could hold the contents of fourteen single‑layer Blu‑ray discs.",
    "Picture this as around 5,250,000 emails without hefty attachments.",
    "Think of it as about 12,000 hours of audiobooks at 64 kbps.",
  ],
  400: [
    "That's about 133 hours of 1080p video for offline viewing.",
    "That's enough for three to four blockbuster game installs.",
    "That could hold around 200,000 ebooks at 2 MB each.",
    "Picture this as nearly 19 days of continuous 1080p security‑camera recording at a moderate bitrate.",
    "Think of it as roughly 570 recordable CDs' worth of storage.",
  ],
  450: [
    "That's about 225,000 smartphone photos.",
    "That's roughly 18 hours of 4K video captured at high quality.",
    "That could hold the data from eighteen single‑layer Blu‑ray discs.",
    "Picture this as around 6,750,000 emails without large attachments.",
    "Think of it as approximately 2,250,000 Word documents at 200 KB each.",
  ],
  500: [
    "That's about 166 hours of HD video you can keep offline.",
    "That's roughly the data for five high‑coverage human genome sequences.",
    "That could hold installs for four to five massive AAA games.",
    "Picture this as around 250,000 ebooks at 2 MB each.",
    "Think of it as about 106 single‑layer DVDs' worth of storage.",
  ],
  600: [
    "That's roughly 12,000 hours of music streaming at standard quality.",
    "That's about 300,000 smartphone photos.",
    "That could hold close to a full day of 4K video at high quality.",
    "Picture this as the data from twenty‑four single‑layer Blu‑ray discs.",
    "Think of it as nearly 9,000,000 emails without heavy attachments.",
  ],
  700: [
    "That's about 233 hours of 1080p video saved offline.",
    "That's roughly 7,000 average mobile apps installed.",
    "That could hold around 28,000 DSLR RAW photos at 25 MB each.",
    "Picture this as about 149 single‑layer DVDs' worth of data.",
    "Think of it as approximately 350,000 ebooks at 2 MB each.",
  ],
  800: [
    "That's roughly 32 hours of 4K video captured at high quality.",
    "That's about 400,000 smartphone photos.",
    "That could hold the equivalent of thirty‑two single‑layer Blu‑ray discs.",
    "Picture this as nearly 12,000,000 emails without large attachments.",
    "Think of it as installs for seven to eight blockbuster games.",
  ],
  900: [
    "That's about 300 hours of HD video ready to watch offline.",
    "That's roughly 18,000 hours of music streaming at standard quality.",
    "That could hold approximately 4,500,000 Word documents at 200 KB each.",
    "Picture this as about 191 single‑layer DVDs' worth of data.",
    "Think of it as around 450,000 ebooks at 2 MB each.",
  ],
  1000: [
    "That's about 1 terabyte, enough for roughly 500,000 smartphone photos.",
    "That's roughly 40 hours of 4K video recorded at high quality.",
    "That could hold data for about ten high‑coverage human genome sequences.",
    "Picture this as the data from forty single‑layer Blu‑ray discs.",
    "Think of it as close to 15,000,000 emails without large attachments.",
  ],
};

const thresholds = Object.keys(download_amounts)
  .map(Number)
  .sort((a, b) => a - b);

const random_seed = Math.floor(Math.random() * 1000);

export function get_download_equivalent(size: number): string {
  let selected_threshold = thresholds[0];
  for (const threshold of thresholds) {
    if (size >= threshold) {
      selected_threshold = threshold;
    } else {
      break;
    }
  }

  const download_options = download_amounts[selected_threshold];
  const index = random_seed % download_options.length;
  return download_options[index];
}
