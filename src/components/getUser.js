import axios from "axios";

/*
 * Sender en asynkron GET-forespørsel og henter brukerdetaljer vha. den lagrede token.
 *
 * @return et objekt med brukerinformasjon dersom forespørselen lykkes
 *         null ellers
 */
export default async function getUser() {
  const token = sessionStorage.getItem("token");

  if (token && token !== "") {
    return await axios
      .get("http://localhost:8000/api/users/", {
        params: { token: token },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
        sessionStorage.removeItem("token");
        window.location.replace("login");
        return;
      });
  } else {
    return null;
  }
}
