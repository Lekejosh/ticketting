export const natsWrapper = {
  client: {
    publish: jest
      .fn()
      .mockImplementation(
        (subject: string, dat: string, callback: () => void) => {
          callback();
        }
      ),
  },
};
