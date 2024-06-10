function html(senha) {
   const html5 =  `<!DOCTYPE html>
   <html lang="pt-BR">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Senha de Administrador</title>
     <style>
       /* CSS styles for the email template */
       body {
         font-family: Arial, sans-serif;
         margin: 0;
         padding: 0;
         background-color: #f4f4f4;
       }
   
       .container {
         max-width: 600px;
         margin: 20px auto;
         padding: 20px;
         background-color: #ffffff;
         border-radius: 10px;
         box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
         border: 1px solid #e0e0e0;
       }
   
       .header {
         text-align: center;
         padding-bottom: 20px;
         border-bottom: 2px solid #eaeaea;
       }
   
       .header h1 {
         margin: 0;
         font-size: 28px;
         color: #333333;
       }
   
       .header img {
         width: 50px;
         margin-bottom: 10px;
       }
   
       .content {
         padding: 20px;
       }
   
       .content p {
         margin: 16px 0;
         font-size: 16px;
         line-height: 1.6;
         color: #555555;
       }
   
       .password {
         display: block;
         margin: 20px 0;
         padding: 10px;
         background-color: #f9f9f9;
         border: 1px solid #dddddd;
         border-radius: 5px;
         font-size: 18px;
         color: #333333;
         text-align: center;
         word-wrap: break-word;
         font-weight: bold;
       }
   
       .footer {
         text-align: center;
         padding-top: 20px;
         border-top: 2px solid #eaeaea;
       }
   
       .footer p {
         margin: 0;
         font-size: 14px;
         color: #888888;
       }
   
       .footer img {
         width: 30px;
         margin-top: 10px;
       }
   
       .footer a {
         color: #888888;
         text-decoration: none;
       }
     </style>
   </head>
   <body>
     <div class="container">
       <div class="header">
         <img src="https://imgur.com/5wApH5g.png" alt="Logo">
         <h1>Administrador Bot 🤖</h1>
       </div>
       <div class="content">
         <p>Olá, Administrador(a)!</p>
         <p>Estamos enviando a sua nova senha de administrador para o bot. Por favor, mantenha-a segura e não a compartilhe com ninguém.</p>
         <p class="password">🔑 ${senha} 🔑</p>
         <p>Atenciosamente,</p>
         <p>Equipe csdev</p>
       </div>
       <div class="footer">
         <p>Este é um e-mail automático, por favor não responda.</p>
         <p>&copy; 2024 csdev. Todos os direitos reservados.</p>
         <img src="https://imgur.com/5wApH5g.png" alt="Logo">
         <p><a href="http://github.com/carlos676767">www.csdev.com</a></p>
       </div>
     </div>
   </body>
   </html>`

   return html5
}


module.exports = html