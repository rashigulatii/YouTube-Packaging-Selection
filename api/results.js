const { createClient } = require('@supabase/supabase-js');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );

  const { data, error } = await supabase
    .from('votes')
    .select('option_num');

  if (error) {
    console.error('Supabase read error:', error);
    return res.status(500).json({ error: 'Database error' });
  }

  const counts = [0, 0, 0, 0];
  for (const row of data) {
    const idx = row.option_num - 1;
    if (idx >= 0 && idx < 4) counts[idx]++;
  }

  return res.status(200).json({ votes: counts });
};
