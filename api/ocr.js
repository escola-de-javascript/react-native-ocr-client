import axios from 'axios';

const createFormData = (photo) => {
  let data = new FormData();
  data.append("image", {
    uri: photo.uri,
    name: 'image.jpg',
    type: 'image/jpeg'
  });
  return data;
};

export async function handleUpload(uri) {
  const bodyData = createFormData(uri);
  const text = await axios({
    url: "<api_url>/upload",
    method: "post",
    data: bodyData,
    config: { headers: { 'Content-Type': 'multipart/form-data' } }
  }).then(response => {
    return response;
  })
    .catch(error => {
      return { data: "falha ao processar texto" };
    });
  return text.data;
};