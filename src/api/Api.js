// Core
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export function getTodoData() {
  return instance('/posts')
    .then(res => res.data);
}

export function addNewTask(value) {
  return instance.post('/posts', {
    title: value,
    isDone: false
  })
    .then(res => res.data);
}

export function changeCurTaskStatus(id, isDone) {
  return instance.patch(`/posts/${id}`, { isDone })
    .then(res => res.data);
}

export function editCurrentTask(id, title) {
  return instance.patch(`/posts/${id}`, { title })
    .then(res => res.data);
}

export function deleteCurrentTask(id) {
  return instance.delete(`/posts/${id}`)
    .then(res => res.data);
}