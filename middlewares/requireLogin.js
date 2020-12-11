module.exports = (req, res, next) => {
	if (!req.user) {
		return res.send({ error: "Debes iniciar sesión." });
	}

	next();
};
