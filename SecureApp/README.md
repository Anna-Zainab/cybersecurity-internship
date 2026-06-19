# SecureApp — Cybersecurity Internship Project

A Node.js/Express REST API built and progressively hardened across Weeks 4–6 
of a cybersecurity internship. The project demonstrates real-world application 
of defensive security controls, ethical hacking practices, and security auditing.

---

## Security Features Implemented

### Week 4 — API Hardening & Security Headers
- **Rate Limiting** — `express-rate-limit`: max 5 requests per 15 minutes per IP
- **CORS Restriction** — requests only accepted from trusted origin
- **API Key Authentication** — custom middleware validates `x-api-key` header
- **Content-Security-Policy** — via Helmet, restricts resource loading to same origin
- **HSTS** — enforces HTTPS with 1-year max-age and includeSubDomains
- **Winston Logging** — structured JSON logs to console and `security.log`

### Week 5 — Ethical Hacking & CSRF Protection
- **SQL Injection Testing** — manual payloads and SQLMap used against OWASP Juice Shop
- **CSRF Protection** — `csurf` middleware with cookie-based token validation
- **bcrypt Password Hashing** — 10 salt rounds on all stored passwords
- **JWT Authentication** — stateless token-based login flow
- **Input Validation** — email format enforced via `validator` library

### Week 6 — Security Audit
- **OWASP ZAP Scan** — 0 critical, high, or medium vulnerabilities found
- **npm Audit** — 2 low-severity issues identified and resolved with `npm audit fix`
- **OWASP Top 10 Compliance** — all 10 categories reviewed and addressed

---

## Project Structure

```
SecureApp/
├── server.js          # Main app — middleware, routes, security config
├── routes/
│   └── auth.js        # Register and login routes (bcrypt + JWT)
├── middleware/
│   └── apiKey.js      # API key validation middleware
├── users.json         # User store (file-based, bcrypt hashed passwords)
├── security.log       # Winston security event log
└── package.json       # Dependencies
```

---

## How to Run

```bash
npm install
node server.js
```

Server starts at `http://localhost:3000`

---

## Tools & Technologies

| Tool | Purpose |
|------|---------|
| Node.js / Express | Backend framework |
| Helmet | Security headers (CSP, HSTS) |
| express-rate-limit | Brute-force protection |
| csurf + cookie-parser | CSRF token protection |
| bcrypt | Password hashing |
| jsonwebtoken | JWT authentication |
| winston | Security event logging |
| OWASP ZAP | Vulnerability scanning |
| SQLMap | SQL injection testing |
| OWASP Juice Shop | Ethical hacking practice target |

---

**Intern:** Anna Zainab  
**Internship Period:** Weeks 4–6  
**Deadline:** June 30, 2026
