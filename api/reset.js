const { createClient } = require('@supabase/supabase-js');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );

  const { error } = await supabase
    .from('votes')
    .delete()
    .neq('id', 0);

  if (error) {
    console.error('Supabase delete error:', error);
    return res.status(500).json({ error: 'Database error' });
  }

  return res.status(200).json({ ok: true });
};
