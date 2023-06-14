function successMsg(res, status, data, message) {
  const obj = { status: status, message: message, data: data };
  if (Array.isArray(data)) {
    obj.count = data.length;
  }
  res.status(status).json(obj);
}

function errorMsg(res, status, message) {
  res.status(status).json({ status: status, message: message });
}

function customMsg(res, status, message) {
  res.status(status).json({ message: message });
}

export default { successMsg, errorMsg, customMsg };
