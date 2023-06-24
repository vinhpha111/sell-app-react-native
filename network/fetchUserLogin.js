import fetch from './fetch'
export default async function fetchUserLogin() {
  try {
    const res = await fetch('api/users/info', {
      method: 'GET'
    })
    if (res.status === 200) {
      const data = await res.json();
      return data;
    }
    return null
  } catch (error) {
    console.log(error)
  }
}