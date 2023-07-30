import { Timestamp } from "firebase-admin/firestore";
import { getHours } from "date-fns";

import type { Lead } from "../../types/Lead";

export const formatMessage = (
  message: string,
  lead: Lead,
  ctime: Timestamp
) => {
  const time = getHours(ctime.toDate());

  const isDay = time <= 12;
  const isAffternoon = 12 < time && time < 18;
  const isNight = time >= 18;

  let greeting = "";

  if (isDay) {
    greeting = "Bom dia";
  } else if (isAffternoon) {
    greeting = "Boa tarde";
  } else if (isNight) {
    greeting = "Boa noite";
  }

  return message
    .replace("[Nome]", lead.name || "")
    .replace("[Email]", lead.email || "")
    .replace("[CPF]", lead.cpf || "")
    .replace("[Telefone]", lead.phone || "")
    .replace("[Pix]", lead.pixCode || "")
    .replace("[Boleto]", lead.boletoUrl || "")
    .replace("[Saudação]", greeting);
};
