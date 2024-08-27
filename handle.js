async function handle(req, res, method) {
  try {
    const onSuccess = await method(req)
    res.send({ status: 'success', response: onSuccess })
  } catch (e) {
    res.send({ status: 'fail', error: e.message })
  }
}

module.exports = handle
