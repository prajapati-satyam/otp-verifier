const express = require('express');
const {send_mail_controller, otp_verify_controller} = require('../controller/send_mail.controller');
const check_mail = require('../middleware/send_mail_middleware');
const send_mail = express.Router();

send_mail.post('/', check_mail ,send_mail_controller);
send_mail.post('/verify', check_mail,otp_verify_controller);

module.exports = send_mail