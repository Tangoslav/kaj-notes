export const playSound = (soundFile: string) => {
    const audio = new Audio(soundFile);
    audio.play();
};
