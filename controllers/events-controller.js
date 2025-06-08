import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { eventTypes } from '../constants/eventTypes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '../mock/dbSubscriptions.json');
const subscriptionsData = JSON.parse(fs.readFileSync(dbPath));

export const postEvents = (req, res) => {
  const {
    data: {
      object: {
        customer: customerId,
        items: { data },
        trial_end,
        trial_start
      }
    },
    type
  } = req.body;

  if (eventTypes[type] === 'deleted' && data[0].deleted) {
    delete subscriptionsData[customerId];

    fs.writeFileSync(dbPath, JSON.stringify(subscriptionsData, null, 2));
    return res.status(200).json({
      message: `Subscription for customer ${customerId} is ${eventTypes[type]}`
    });
  }

  const [{ current_period_end, current_period_start }] = data;

  subscriptionsData[customerId] = {
    current_period_end,
    current_period_start,
    trial_end,
    trial_start
  };

  fs.writeFileSync(dbPath, JSON.stringify(subscriptionsData, null, 2));
  return res.status(200).json({
    message: `Subscription for customer ${customerId} is ${eventTypes[type]}`
  });
};
