export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.token) {
      return { 'Authorization':'Bearer ' + user.token, 'Content-Type' : 'application/x-www-form-urlencoded' };
    } else {
      return {};
    }
  }