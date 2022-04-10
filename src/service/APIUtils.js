import { API_BASE_URL, ACCESS_TOKEN } from "../util/constants";
import { AsyncStorage } from "react-native";

const getItem = async () => {
  let token = await AsyncStorage.getItem("userToken");
  console.log("!!!!!!!!!!!!!!!!!!!!token !!!!!!!!!!!!!" + token);
  return token;
};
const request = (options) => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });
  // console.log(
  //   "request : AsyncStorage -> getItem()" + JSON.stringify(getItem())
  // );
  // let token =await AsyncStorage.getItem("userToken");
  let token = getItem();
  if (token != null) {
    console.log(">>>>>>>>>>>>>>>>> TOEKN is NOT NULL >>>>>>>>>>>>>>>>>>");
    headers.append("Authorization", "Bearer " + token);
  }

  const defaults = { headers: headers };
  console.log("headers :" + JSON.stringify(headers));
  options = Object.assign({}, defaults, options);
  console.log(options.url);
  console.log(JSON.stringify(options));
  return fetch(options.url, options).then((response) =>
    response
      .json()
      .then((json) => {
        console.log(response);
        if (!response.ok) {
          console.log("error occur while calling signin");
          return Promise.reject(json);
        }
        console.log(".........user token startup ...." + json.userToken);

        return json;
      })
      .catch((error) => {
        console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee " + error);
      })
  );
};

// const request1 = (options) => {
//   const headers = new Headers({
//     //  'Content-Type': 'application/json',
//   });

//   if (localStorage.getItem("accessToken")) {
//     headers.append(
//       "Authorization",
//       "Bearer " + localStorage.getItem("accessToken")
//     );
//   }

//   const defaults = { headers: headers };
//   options = Object.assign({}, defaults, options);

//   return fetch(options.url, options).then((response) =>
//     response.json().then((json) => {
//       if (!response.ok) {
//         return Promise.reject(json);
//       }
//       return json;
//     })
//   );
// };

// export function getAllItems(id) {
//   return request({
//     url: INVENTORY_BASE_URL + "/shops/" + id + "/items",
//     method: "GET",
//   });
// }

// export function getItem(id) {
//   return request({
//     url: INVENTORY_BASE_URL + "/shops/3/items/" + id,
//     method: "GET",
//   });
// }

// export function getShops(id) {
//   console.log("UI- APIUtils.js laoding shops :" + id);
//   return request({
//     url: INVENTORY_BASE_URL + "/shops?ids=" + id,
//     method: "GET",
//   });
// }

// export function deleteItem(id) {
//   alert("delete item :" + id);
//   return request({
//     url: INVENTORY_BASE_URL + "/items/" + id,
//     method: "DELETE",
//   });
// }

// export function createPoll(pollData) {
//   return request({
//     url: API_BASE_URL + "/polls",
//     method: "POST",
//     body: JSON.stringify(pollData),
//   });
// }

// export function castVote(voteData) {
//   return request({
//     url: API_BASE_URL + "/polls/" + voteData.pollId + "/votes",
//     method: "POST",
//     body: JSON.stringify(voteData),
//   });
// }

export function login(loginRequest) {
  return request({
    url: API_BASE_URL + "/auth/signin",
    method: "POST",
    body: JSON.stringify(loginRequest),
  });
}

export function signup(signupRequest) {
  return request({
    url: API_BASE_URL + "/auth/signup",
    method: "POST",
    body: JSON.stringify(signupRequest),
  });
}

export function getCurrentUser() {
  // console.log(
  //   "UI- AppUtils ->  getCurrentUser ACCESS_TOKEN from LocalStorage : " +
  //     // localStorage.getItem(ACCESS_TOKEN)
  //     AsyncStorage.getItem("userToken")
  // );
  // if (!AsyncStorage.getItem(ACCESS_TOKEN)) {
  //   console.log(
  //     "UI- AppUtils -> ACCESS_TOKEN " + AsyncStorage.getItem(ACCESS_TOKEN)
  //   );
  //   return Promise.reject("No access token set.");
  // }
  return request({
    url: API_BASE_URL + "/user/me",
    method: "GET",
  });
}
// export function uploadFiles(uploadRequest, itemId) {
//   console.log("UI- APIUtils.js -> upload files :itemId :" + itemId);
//   return request1({
//     url: INVENTORY_BASE_URL + "/upload/" + itemId,
//     method: "POST",
//     body: uploadRequest,
//   });
// }

// export function submitItem(itemRequest) {
//   console.log("...................................." + itemRequest);
//   return request({
//     url: INVENTORY_BASE_URL + "/shops/3/items",
//     method: "POST",
//     body: JSON.stringify(itemRequest),
//   });
// }

// export function updateItem(itemRequest) {
//   console.log(
//     "...................................." + JSON.stringify(itemRequest)
//   );
//   return request({
//     url: INVENTORY_BASE_URL + "/items/" + itemRequest.id,
//     method: "PUT",
//     body: JSON.stringify(itemRequest),
//   });
// }

export function sendPasswordResetToken(passwordResetToken) {
  return request({
    url: API_BASE_URL + "/auth/forgot-password",
    method: "POST",
    body: JSON.stringify(passwordResetToken),
  });
}

export function checkUsernameAvailability(username) {
  return request({
    url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
    method: "GET",
  });
}

export function checkEmailAvailability(email) {
  return request({
    url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
    method: "GET",
  });
}

// export function getCurrentUser() {
//   console.log(
//     "UI- AppUtils ->  getCurrentUser ACCESS_TOKEN from LocalStorage : " +
//       localStorage.getItem(ACCESS_TOKEN)
//   );
//   if (!localStorage.getItem(ACCESS_TOKEN)) {
//     console.log(
//       "UI- AppUtils -> ACCESS_TOKEN " + localStorage.getItem(ACCESS_TOKEN)
//     );
//     return Promise.reject("No access token set.");
//   }

//   return request({
//     url: API_BASE_URL + "/user/me",
//     method: "GET",
//   });
// }

export function getUserProfile(username) {
  return request({
    url: API_BASE_URL + "/users/" + username,
    method: "GET",
  });
}

// export function getUserCreatedPolls(username, page, size) {
//   page = page || 0;
//   size = size || POLL_LIST_SIZE;

//   return request({
//     url:
//       API_BASE_URL +
//       "/users/" +
//       username +
//       "/polls?page=" +
//       page +
//       "&size=" +
//       size,
//     method: "GET",
//   });
// }

// export function getUserVotedPolls(username, page, size) {
//   page = page || 0;
//   size = size || POLL_LIST_SIZE;

//   return request({
//     url:
//       API_BASE_URL +
//       "/users/" +
//       username +
//       "/votes?page=" +
//       page +
//       "&size=" +
//       size,
//     method: "GET",
//   });
// }
