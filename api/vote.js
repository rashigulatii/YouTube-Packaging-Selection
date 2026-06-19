const { createClient } = require('@supabase/supabase-js');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { option, title, project } = req.body;
  if (!option || option < 1 || option > 4) {
    return res.status(400).json({ error: 'Invalid option' });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );

  const { error } = await supabase.from('votes').insert({
    option_num: option,
    option_title: title || null,
    project: project || null,
  });

  if (error) {
    console.error('Supabase insert error:', error);
    return res.status(500).json({ error: 'Database error' });
  }

  return res.status(200).json({ ok: true });
};
