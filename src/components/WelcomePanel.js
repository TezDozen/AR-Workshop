const WelcomePanel = ({ onClick }) => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        zIndex: 100,
        backgroundColor: "#ddc57d",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
      onClick={() => {
        const soundEffect = new Audio();
        soundEffect.autoplay = true;

        // onClick of first interaction on page before I need the sounds
        // (This is a tiny MP3 file that is silent and extremely short - retrieved from https://bigsoundbank.com and then modified)
        soundEffect.src =
          "data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";
        onClick?.();
      }}
    >
      <span style={{ flexGrow: 2 }} />
      <img
        src="https://tezdozen.xyz/images/title.png"
        alt="logo"
        style={{
          maxHeight: "30%",
          maxWidth: "70%",
          aspectRatio: "771 / 149",
          marginBottom: 20,
        }}
      />
      <span style={{ flexGrow: 1 }} />
      <span
        style={{
          color: "#00350D",
          fontWeight: "bold",
          flexBasis: 1,
          lineHeight: 1.5,
          textTransform: "uppercase",
          fontSize: "1.5rem",
        }}
      >
        Click to Start
      </span>
      <span style={{ flexGrow: 1 }} />
      <img
        src="/mind-ar-test/target_image/goat.png"
        alt="goat"
        style={{ maxHeight: "50%", maxWidth: "90%", aspectRatio: "1" }}
      />
    </div>
  );
};

export default WelcomePanel;
