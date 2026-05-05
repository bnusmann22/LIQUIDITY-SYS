/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./lib/**/*.{js,jsx}", "./web/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0B1220",
        text: "#E5E7EB",
        muted: "#9CA3AF",
        border: "rgba(255,255,255,0.08)",
        glass: {
          1: "rgba(255,255,255,0.05)",
          2: "rgba(255,255,255,0.08)"
        },
        green: "#10B981",
        teal: "#06B6D4",
        amber: "#F59E0B",
        red: "#EF4444",
        blue: "#3B82F6"
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.37)",
        "glass-hover": "0 8px 32px rgba(0,0,0,0.5)"
      },
      borderRadius: {
        glass: "12px"
      },
      spacing: {
        18: "4.5rem",
        88: "22rem"
      }
    }
  },
  plugins: []
};
