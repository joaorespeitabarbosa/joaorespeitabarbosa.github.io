# 📧 EmailJS Configuration Guide

## Passo 1: Criar conta no EmailJS

1. Vai a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Clica em "Sign Up" e cria uma conta gratuita
3. Verifica o teu email

## Passo 2: Adicionar Email Service

1. No dashboard do EmailJS, vai a **Email Services**
2. Clica em **Add New Service**
3. Escolhe **Gmail** (ou outro serviço de email que uses)
4. Clica em **Connect Account** e autoriza o acesso
5. Copia o **Service ID** (algo como "service_xxxxxxx")

## Passo 3: Criar Email Template

1. Vai a **Email Templates**
2. Clica em **Create New Template**
3. Usa este template:

```
Subject: New message from {{user_name}}

From: {{user_name}}
Email: {{user_email}}

Message:
{{message}}
```

4. No campo **To Email**, coloca o teu email (joaorb.02@gmail.com)
5. Guarda e copia o **Template ID** (algo como "template_xxxxxxx")

## Passo 4: Obter Public Key

1. Vai a **Account** > **General**
2. Copia a **Public Key** (algo como "xxxxxxxxxxxxxxxxxx")

## Passo 5: Atualizar o código

No ficheiro `index.html`, procura por estas 3 linhas e substitui:

```javascript
// Linha ~628
emailjs.init('YOUR_PUBLIC_KEY');  // Substitui por: emailjs.init('a_tua_public_key')

// Linha ~648
emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
// Substitui por: emailjs.sendForm('service_xxxxx', 'template_xxxxx', this)
```

## Exemplo completo:

```javascript
// Antes:
emailjs.init('YOUR_PUBLIC_KEY');
emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)

// Depois (com os teus IDs reais):
emailjs.init('xLm9kP3jQ2vN8hR4');
emailjs.sendForm('service_abc123', 'template_xyz789', this)
```

## Teste

1. Abre o teu site
2. Clica em "INITIATE CONTACT PROTOCOL"
3. Preenche o formulário
4. Clica em "SEND MESSAGE"
5. Deves ver "✓ Message sent successfully!"
6. Verifica o teu email (joaorb.02@gmail.com)

## Limites Gratuitos

- 200 emails por mês
- Mais que suficiente para um portfolio pessoal!

## Troubleshooting

Se não funcionar:
1. Verifica a consola do browser (F12) para erros
2. Confirma que os 3 IDs estão corretos
3. Confirma que o serviço de email está conectado no EmailJS
4. Verifica se o template está ativo

## Segurança

✅ A tua Public Key pode estar pública (é segura)
✅ Os IDs de Service e Template também podem ser públicos
✅ Ninguém pode enviar emails em massa porque o EmailJS tem rate limiting
✅ O teu email pessoal fica privado (só aparece como destinatário no EmailJS)
