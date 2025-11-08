const formLogin = document.getElementById('loginForm');

formLogin.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  const res = await fetch('/api/noiva/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha })
  });

  const data = await res.json();
  if (res.ok && data.token) {
    localStorage.setItem('noivaToken', data.token);
    window.location.href = 'index.html';
  } else {
    alert(data.message || 'Falha no login.');
  }
});
