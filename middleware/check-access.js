import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '..', 'mock', 'dbSubscriptions.json');

const activeSubStatuses = new Set(['active', 'trialing']);

export const checkAccess = (req, res, next) => {
  const subscriptionsData = JSON.parse(fs.readFileSync(dbPath));
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

  if (!activeSubStatuses.has(customer.status)) {
    const error = new Error(
      `Access denied: customer ${customerId} subscription is not active`
    );
    error.status = 403;
    return next(error);
  }

  req.customer = {
    id: customerId,
    status: customer.status
  };

  next();
};
