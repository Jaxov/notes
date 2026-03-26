export async function login(login, password) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000) // 10 секунд

  try {
    const res = await fetch('http://localhost:8000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: login, password }),
      signal: controller.signal
    })

    if (!res.ok) {
      // Попробуем вытащить тело с ошибкой, если есть
      let errText = ""
      try {
        const errData = await res.json()
        errText = errData?.detail || JSON.stringify(errData)
      } catch {
        errText = await res.text().catch(() => "")
      }
      const err = new Error(`HTTP_${res.status}`)
      err.kind = "http"
      err.status = res.status
      err.detail = errText
      throw err
    }

    // Всё ок — возвращаем JSON
    return await res.json()

  } catch (e) {
    if (e.name === "AbortError") {
      throw { kind: "timeout" }
    }
    if (e instanceof TypeError) {
      throw { kind: "network" }
    }
    if (e.kind) {
      throw e
    }
    throw { kind: "unknown", original: e }
  } finally {
    clearTimeout(timeout)
  }
}

export async function register(email, password) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000) // 10 секунд

  try {
    const res = await fetch('http://localhost:8000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      signal: controller.signal
    })

    clearTimeout(timeout)

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}))
      throw new Error(errData.detail || 'Ошибка регистрации')
    }

    const data = await res.json() // здесь будет {id, email} или что вернёт бэкенд
    return data
  } catch (err) {
    clearTimeout(timeout)
    throw err
  }
}


export async function verifyToken(token) {
  const res = await fetch('http://localhost:8000/auth/verify', {
    method: 'GET', // эндпоинт GET, не POST
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  

  if (!res.ok) throw new Error('Token invalid')
  const data = await res.json()
  return data
}
