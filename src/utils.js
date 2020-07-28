'use strict'

function parsePayload(payload) {
  if (payload instanceof Buffer) {
    payload = payload.toString('utf8')
  }

  try {
    payload
    // payload = toString(payload)
  } catch (e) {
    payload = null
  }

  return payload
}

function dataPayload(payload) {
  let position;

  if (!payload) {
    position = payload;
  } else {
    let coords = payload.split(" ");
    position = {
      latitud: coords[0],
      longitud: coords[1]
    }
  }

  return position;
}

module.exports = {
  parsePayload,
  dataPayload
}
