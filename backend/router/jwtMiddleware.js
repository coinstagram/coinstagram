const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  // 인증 완료
  try {
    // 요청 헤더에 저장된 토큰(req.headers.authorization)과 비밀키를 사용하여 토큰 반환

    // 테스트용
    const token = req.headers.authorization.split('Bearer ')[1];
    if (!token) {
      return next();
    }
    // eslint-disable-next-line no-undef
    jwt.verify(token, process.env.JWT_SECRET);

    return next();
  } catch (error) {
    // 인증 실패
    // 유효기간이 초과된 경우
    if (error.name === 'TokenExpiredError') {
      return res.status(419).json({
        code: 419,
        message: '토큰이 만료되었습니다.',
      });
    }
    // 토큰의 비밀키가 일치하지 않는 경우
    return res.status(401).json({
      code: 401,
      message: '유효하지 않은 토큰입니다.',
    });
  }
};
