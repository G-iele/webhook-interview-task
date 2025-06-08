import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '../mock/dbSubscriptions.json');
const subscriptionsData = JSON.parse(fs.readFileSync(dbPath));

export const checkAccess = (req, res, next) => {
  const crrTime = Math.floor(Date.now() / 1000);
  const customerId = req.headers['x-customer-id'];

  if (!customerId) {
    return res.status(400).json({ message: 'Missing x-customer-id header' });
  }

  const customer = subscriptionsData[customerId];

  if (customer === undefined) {
    return res
      .status(400)
      .json({ message: `Customer ${customerId} does not exist` });
  }

  const { trial_start, trial_end, current_period_start, current_period_end } =
    customer;

  const hasTrial =
    trial_start !== null &&
    trial_end !== null &&
    crrTime >= trial_start &&
    crrTime < trial_end;

  const hasSub =
    current_period_start !== null &&
    current_period_end !== null &&
    crrTime >= current_period_start &&
    crrTime < current_period_end;

  if (hasTrial) {
    req.hasAccess = hasTrial;
    return next();
  } else if (hasSub) {
    req.hasAccess = hasSub;
    return next();
  }

  req.hasAccess = hasSub;
  return next();
};
