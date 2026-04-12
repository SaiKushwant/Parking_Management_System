const API_URL = "https://pms-backend-gyvr-git-main-saikushwants-projects.vercel.app";

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validateForm()) return;
  setLoading(true);

  try {
    if (isLogin) {
      // ---- LOGIN ----
      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data?.message || `Login failed`);
        return;
      }

      const userData: User = {
        id: data?._id || "1",
        name: data?.fullName || data.user?.name || "User",
        email: data?.email || formData.email,
      };

      onLogin(userData, data.token);

    } else {
      // ---- SIGN UP ----
      const response = await fetch(`${API_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data?.message || `Sign up failed`);
        return;
      }

      const userData: User = {
        id: data.user?._id || "1",
        name: data.user?.fullName || formData.name,
        email: data.user?.email || formData.email,
      };

      onLogin(userData, data.token);
    }

  } catch (err) {
    console.error("Network error:", err);
    alert("Backend not reachable or API error");
  } finally {
    setLoading(false);
  }
};