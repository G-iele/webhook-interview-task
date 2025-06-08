import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '..', 'mock', 'dbSubscriptions.json');

export const checkAccess = (req, res, next) => {
  const subscriptionsData = JSON.parse(fs.readFileSync(dbPath));
  const crrTime = Math.floor(Date.now() / 1000);
  const customerId = req.headers['x-customer-id'];

  if (!customerId) {
    const error = new Error('Missing x-customer-id header');
    error.status = 400;
    return next(error);
  }

  const customer = subscriptionsData[customerId];

  if (!customer) {
    const error = new Error(
      `Access denied: customer ${customerId} doesn't have subscription`
    );
    error.status = 403;
    return next(error);
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

  if (!hasTrial && !hasSub) {
    const error = new Error(
      `Access denied: customer ${customerId} doesn't have subscription`
    );
    error.status = 403;
    return next(error);
  }

  req.customer = {
    id: customerId,
    hasTrial
  };

  next();
};
