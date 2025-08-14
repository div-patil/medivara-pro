export default function ParallaxWrapper({ children }) {
  return (
    <main
      className="min-h-screen bg-fixed bg-center bg-cover"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1583500174181-990d8f1f0a56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80')`,
      }}
    >
      <div className="backdrop-blur-sm bg-white rounded-es-full  min-h-screen">
        {children}
      </div>
    </main>
  );
}
