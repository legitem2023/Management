import { gql } from "@apollo/client";
export const READLOGIN = gql`
mutation ReadLogin($username: String, $password: String) {
  ReadLogin(username: $username, password: $password) {
    statusText
    jsonToken
  }
}
`