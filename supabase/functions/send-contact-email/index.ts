/**
 * Edge-функция для отправки заявок на email
 * 
 * @description Надёжная отправка форм обратной связи через Resend
 */

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "resend";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ContactFormData {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  source: string;
}

/**
 * Генерация HTML-письма в стиле сайта
 */
const generateEmailHtml = (data: ContactFormData): string => {
  const currentDate = new Date().toLocaleString('ru-RU', {
    timeZone: 'Europe/Moscow',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return `
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f7fa;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f7fa; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);">
          
          <!-- Шапка -->
          <tr>
            <td style="background: linear-gradient(135deg, #00407e 0%, #00a3d5 100%); padding: 32px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">
                🏠 Новая заявка с сайта
              </h1>
              <p style="margin: 8px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px;">
                СтеклоДом Ростов
              </p>
            </td>
          </tr>
          
          <!-- Источник заявки -->
          <tr>
            <td style="padding: 24px 40px 0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color: #e8f4fd; border-radius: 8px; padding: 12px 16px;">
                    <span style="color: #00407e; font-size: 13px; font-weight: 600;">
                      📍 Источник: ${data.source}
                    </span>
                    <span style="color: #718096; font-size: 13px; margin-left: 16px;">
                      ${currentDate} (МСК)
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Данные клиента -->
          <tr>
            <td style="padding: 24px 40px;">
              <h2 style="margin: 0 0 20px; color: #2D3748; font-size: 18px; font-weight: 600;">
                Данные клиента
              </h2>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                <!-- Имя -->
                <tr>
                  <td style="padding: 14px 0; border-bottom: 1px solid #E2E8F0;">
                    <span style="color: #718096; font-size: 13px; display: block; margin-bottom: 4px;">Имя</span>
                    <span style="color: #2D3748; font-size: 16px; font-weight: 600;">${data.name}</span>
                  </td>
                </tr>
                
                <!-- Телефон -->
                <tr>
                  <td style="padding: 14px 0; border-bottom: 1px solid #E2E8F0;">
                    <span style="color: #718096; font-size: 13px; display: block; margin-bottom: 4px;">Телефон</span>
                    <a href="tel:${data.phone.replace(/[^\d+]/g, '')}" style="color: #00a3d5; font-size: 18px; font-weight: 700; text-decoration: none;">
                      ${data.phone}
                    </a>
                  </td>
                </tr>
                
                ${data.email ? `
                <!-- Email -->
                <tr>
                  <td style="padding: 14px 0; border-bottom: 1px solid #E2E8F0;">
                    <span style="color: #718096; font-size: 13px; display: block; margin-bottom: 4px;">Email</span>
                    <a href="mailto:${data.email}" style="color: #00a3d5; font-size: 16px; text-decoration: none;">
                      ${data.email}
                    </a>
                  </td>
                </tr>
                ` : ''}
                
                ${data.message ? `
                <!-- Сообщение -->
                <tr>
                  <td style="padding: 14px 0;">
                    <span style="color: #718096; font-size: 13px; display: block; margin-bottom: 4px;">Сообщение</span>
                    <p style="margin: 0; color: #2D3748; font-size: 15px; line-height: 1.6; background-color: #F7FAFC; padding: 12px 16px; border-radius: 8px; border-left: 3px solid #00a3d5;">
                      ${data.message}
                    </p>
                  </td>
                </tr>
                ` : ''}
              </table>
            </td>
          </tr>
          
          <!-- Кнопка звонка -->
          <tr>
            <td style="padding: 0 40px 32px;">
              <a href="tel:${data.phone.replace(/[^\d+]/g, '')}" style="display: block; background: linear-gradient(135deg, #ff342f 0%, #e02e29 100%); color: #ffffff; text-align: center; padding: 16px 24px; border-radius: 12px; text-decoration: none; font-size: 16px; font-weight: 600; box-shadow: 0 4px 16px rgba(255, 52, 47, 0.3);">
                📞 Позвонить клиенту
              </a>
            </td>
          </tr>
          
          <!-- Подвал -->
          <tr>
            <td style="background-color: #F7FAFC; padding: 20px 40px; text-align: center; border-top: 1px solid #E2E8F0;">
              <p style="margin: 0; color: #718096; font-size: 12px;">
                Это автоматическое уведомление с сайта steklo-dom-rostov.lovable.app
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
};

const handler = async (req: Request): Promise<Response> => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const data: ContactFormData = await req.json();

    // Валидация
    if (!data.name?.trim() || !data.phone?.trim()) {
      return new Response(
        JSON.stringify({ success: false, error: "Имя и телефон обязательны" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Отправка email для:", data.name, data.phone);

    // Отправка письма
    const emailResponse = await resend.emails.send({
      from: "СтеклоДом <onboarding@resend.dev>",
      to: ["ms.yyy2014@mail.ru"],
      subject: `🏠 Новая заявка: ${data.name} — ${data.phone}`,
      html: generateEmailHtml(data),
    });

    console.log("Email отправлен:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, data: emailResponse }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );

  } catch (error: unknown) {
    console.error("Ошибка отправки email:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Неизвестная ошибка";
    
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
