import nodemailer from "nodemailer";

export const sendEmail = async (emailToSend, newPassword) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let message = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: emailToSend,
      subject: "Taskly - Recuperação de senha",
      html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #4CAF50;">Recuperação de Senha</h2>
        <p>Olá,</p>
        <p>Recebemos uma solicitação para redefinir sua senha do Taskly</p>
        <p>sua nova senha é: <strong>${newPassword}</strong></p>
        <p>Utilize ela para fazer login no aplicativo.</p>
        <p>Se você não solicitou essa alteração, por favor ignore este e-mail.</p>
        <p>Atenciosamente,<br/>Equipe Taskly</p>
      </div>
    `,
    });

    return true;
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return false;
  }
};
