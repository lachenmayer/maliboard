// This file is auto generated by the protocol-buffers compiler

/* eslint-disable quotes */
/* eslint-disable indent */
/* eslint-disable no-redeclare */
/* eslint-disable camelcase */

// Remember to `npm install --save protocol-buffers-encodings`
var encodings = require('protocol-buffers-encodings')
var varint = encodings.varint
var skip = encodings.skip

var NoteOn = exports.NoteOn = {
  buffer: true,
  encodingLength: null,
  encode: null,
  decode: null
}

var NoteOff = exports.NoteOff = {
  buffer: true,
  encodingLength: null,
  encode: null,
  decode: null
}

var Message = exports.Message = {
  buffer: true,
  encodingLength: null,
  encode: null,
  decode: null
}

var Broadcast = exports.Broadcast = {
  buffer: true,
  encodingLength: null,
  encode: null,
  decode: null
}

defineNoteOn()
defineNoteOff()
defineMessage()
defineBroadcast()

function defineNoteOn () {
  var enc = [
    encodings.double
  ]

  NoteOn.encodingLength = encodingLength
  NoteOn.encode = encode
  NoteOn.decode = decode

  function encodingLength (obj) {
    var length = 0
    if (!defined(obj.frequency)) throw new Error("frequency is required")
    var len = enc[0].encodingLength(obj.frequency)
    length += 1 + len
    return length
  }

  function encode (obj, buf, offset) {
    if (!offset) offset = 0
    if (!buf) buf = Buffer.allocUnsafe(encodingLength(obj))
    var oldOffset = offset
    if (!defined(obj.frequency)) throw new Error("frequency is required")
    buf[offset++] = 9
    enc[0].encode(obj.frequency, buf, offset)
    offset += enc[0].encode.bytes
    encode.bytes = offset - oldOffset
    return buf
  }

  function decode (buf, offset, end) {
    if (!offset) offset = 0
    if (!end) end = buf.length
    if (!(end <= buf.length && offset <= buf.length)) throw new Error("Decoded message is not valid")
    var oldOffset = offset
    var obj = {
      frequency: 0
    }
    var found0 = false
    while (true) {
      if (end <= offset) {
        if (!found0) throw new Error("Decoded message is not valid")
        decode.bytes = offset - oldOffset
        return obj
      }
      var prefix = varint.decode(buf, offset)
      offset += varint.decode.bytes
      var tag = prefix >> 3
      switch (tag) {
        case 1:
        obj.frequency = enc[0].decode(buf, offset)
        offset += enc[0].decode.bytes
        found0 = true
        break
        default:
        offset = skip(prefix & 7, buf, offset)
      }
    }
  }
}

function defineNoteOff () {
  var enc = [
    encodings.double
  ]

  NoteOff.encodingLength = encodingLength
  NoteOff.encode = encode
  NoteOff.decode = decode

  function encodingLength (obj) {
    var length = 0
    if (!defined(obj.frequency)) throw new Error("frequency is required")
    var len = enc[0].encodingLength(obj.frequency)
    length += 1 + len
    return length
  }

  function encode (obj, buf, offset) {
    if (!offset) offset = 0
    if (!buf) buf = Buffer.allocUnsafe(encodingLength(obj))
    var oldOffset = offset
    if (!defined(obj.frequency)) throw new Error("frequency is required")
    buf[offset++] = 9
    enc[0].encode(obj.frequency, buf, offset)
    offset += enc[0].encode.bytes
    encode.bytes = offset - oldOffset
    return buf
  }

  function decode (buf, offset, end) {
    if (!offset) offset = 0
    if (!end) end = buf.length
    if (!(end <= buf.length && offset <= buf.length)) throw new Error("Decoded message is not valid")
    var oldOffset = offset
    var obj = {
      frequency: 0
    }
    var found0 = false
    while (true) {
      if (end <= offset) {
        if (!found0) throw new Error("Decoded message is not valid")
        decode.bytes = offset - oldOffset
        return obj
      }
      var prefix = varint.decode(buf, offset)
      offset += varint.decode.bytes
      var tag = prefix >> 3
      switch (tag) {
        case 1:
        obj.frequency = enc[0].decode(buf, offset)
        offset += enc[0].decode.bytes
        found0 = true
        break
        default:
        offset = skip(prefix & 7, buf, offset)
      }
    }
  }
}

function defineMessage () {
  var enc = [
    NoteOn,
    NoteOff
  ]

  Message.encodingLength = encodingLength
  Message.encode = encode
  Message.decode = decode

  function encodingLength (obj) {
    var length = 0
    if ((+defined(obj.note_on) + +defined(obj.note_off)) > 1) throw new Error("only one of the properties defined in oneof message can be set")
    if (defined(obj.note_on)) {
      var len = enc[0].encodingLength(obj.note_on)
      length += varint.encodingLength(len)
      length += 1 + len
    }
    if (defined(obj.note_off)) {
      var len = enc[1].encodingLength(obj.note_off)
      length += varint.encodingLength(len)
      length += 1 + len
    }
    return length
  }

  function encode (obj, buf, offset) {
    if (!offset) offset = 0
    if (!buf) buf = Buffer.allocUnsafe(encodingLength(obj))
    var oldOffset = offset
    if ((+defined(obj.note_on) + +defined(obj.note_off)) > 1) throw new Error("only one of the properties defined in oneof message can be set")
    if (defined(obj.note_on)) {
      buf[offset++] = 10
      varint.encode(enc[0].encodingLength(obj.note_on), buf, offset)
      offset += varint.encode.bytes
      enc[0].encode(obj.note_on, buf, offset)
      offset += enc[0].encode.bytes
    }
    if (defined(obj.note_off)) {
      buf[offset++] = 18
      varint.encode(enc[1].encodingLength(obj.note_off), buf, offset)
      offset += varint.encode.bytes
      enc[1].encode(obj.note_off, buf, offset)
      offset += enc[1].encode.bytes
    }
    encode.bytes = offset - oldOffset
    return buf
  }

  function decode (buf, offset, end) {
    if (!offset) offset = 0
    if (!end) end = buf.length
    if (!(end <= buf.length && offset <= buf.length)) throw new Error("Decoded message is not valid")
    var oldOffset = offset
    var obj = {
      note_on: null,
      note_off: null
    }
    while (true) {
      if (end <= offset) {
        decode.bytes = offset - oldOffset
        return obj
      }
      var prefix = varint.decode(buf, offset)
      offset += varint.decode.bytes
      var tag = prefix >> 3
      switch (tag) {
        case 1:
        delete obj.note_off
        var len = varint.decode(buf, offset)
        offset += varint.decode.bytes
        obj.note_on = enc[0].decode(buf, offset, offset + len)
        offset += enc[0].decode.bytes
        break
        case 2:
        delete obj.note_on
        var len = varint.decode(buf, offset)
        offset += varint.decode.bytes
        obj.note_off = enc[1].decode(buf, offset, offset + len)
        offset += enc[1].decode.bytes
        break
        default:
        offset = skip(prefix & 7, buf, offset)
      }
    }
  }
}

function defineBroadcast () {
  var enc = [
    encodings.int64,
    Message
  ]

  Broadcast.encodingLength = encodingLength
  Broadcast.encode = encode
  Broadcast.decode = decode

  function encodingLength (obj) {
    var length = 0
    if (!defined(obj.sender)) throw new Error("sender is required")
    var len = enc[0].encodingLength(obj.sender)
    length += 1 + len
    if (!defined(obj.message)) throw new Error("message is required")
    var len = enc[1].encodingLength(obj.message)
    length += varint.encodingLength(len)
    length += 1 + len
    return length
  }

  function encode (obj, buf, offset) {
    if (!offset) offset = 0
    if (!buf) buf = Buffer.allocUnsafe(encodingLength(obj))
    var oldOffset = offset
    if (!defined(obj.sender)) throw new Error("sender is required")
    buf[offset++] = 8
    enc[0].encode(obj.sender, buf, offset)
    offset += enc[0].encode.bytes
    if (!defined(obj.message)) throw new Error("message is required")
    buf[offset++] = 18
    varint.encode(enc[1].encodingLength(obj.message), buf, offset)
    offset += varint.encode.bytes
    enc[1].encode(obj.message, buf, offset)
    offset += enc[1].encode.bytes
    encode.bytes = offset - oldOffset
    return buf
  }

  function decode (buf, offset, end) {
    if (!offset) offset = 0
    if (!end) end = buf.length
    if (!(end <= buf.length && offset <= buf.length)) throw new Error("Decoded message is not valid")
    var oldOffset = offset
    var obj = {
      sender: 0,
      message: null
    }
    var found0 = false
    var found1 = false
    while (true) {
      if (end <= offset) {
        if (!found0 || !found1) throw new Error("Decoded message is not valid")
        decode.bytes = offset - oldOffset
        return obj
      }
      var prefix = varint.decode(buf, offset)
      offset += varint.decode.bytes
      var tag = prefix >> 3
      switch (tag) {
        case 1:
        obj.sender = enc[0].decode(buf, offset)
        offset += enc[0].decode.bytes
        found0 = true
        break
        case 2:
        var len = varint.decode(buf, offset)
        offset += varint.decode.bytes
        obj.message = enc[1].decode(buf, offset, offset + len)
        offset += enc[1].decode.bytes
        found1 = true
        break
        default:
        offset = skip(prefix & 7, buf, offset)
      }
    }
  }
}

function defined (val) {
  return val !== null && val !== undefined && (typeof val !== 'number' || !isNaN(val))
}