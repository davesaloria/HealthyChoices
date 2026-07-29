import { createClient } from '@/lib/supabase/server'
import { markMessageRead, deleteMessage } from './actions'

export default async function AdminMessagesPage() {
  const supabase = await createClient()
  const { data: messages } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })

  const rows = messages ?? []

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-charcoal-900">Messages</h1>
        <p className="text-charcoal-600 mt-1">{rows.length} messages</p>
      </div>

      <div className="space-y-4">
        {rows.map((msg) => (
          <div
            key={msg.id}
            className={`bg-white rounded-2xl border p-6 ${
              msg.is_read ? 'border-charcoal-100' : 'border-primary-300 bg-primary-50/30'
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
              <div>
                <p className="font-semibold text-charcoal-900">
                  {msg.name}
                  {!msg.is_read && (
                    <span className="ml-2 px-2 py-0.5 rounded-full bg-primary-500 text-white text-xs font-semibold">
                      New
                    </span>
                  )}
                </p>
                <a href={`mailto:${msg.email}`} className="text-sm text-primary-600 hover:underline">
                  {msg.email}
                </a>
                <p className="text-xs text-charcoal-500 mt-1">
                  {new Date(msg.created_at).toLocaleString('en-PH')}
                </p>
              </div>
              <div className="flex gap-3 text-sm">
                <form action={markMessageRead.bind(null, msg.id, !msg.is_read)}>
                  <button type="submit" className="text-primary-600 hover:underline">
                    {msg.is_read ? 'Mark unread' : 'Mark read'}
                  </button>
                </form>
                <form action={deleteMessage.bind(null, msg.id)}>
                  <button type="submit" className="text-coral-600 hover:underline">
                    Delete
                  </button>
                </form>
              </div>
            </div>
            {msg.subject && (
              <p className="font-semibold text-charcoal-900 mb-1">{msg.subject}</p>
            )}
            <p className="text-charcoal-700 whitespace-pre-wrap">{msg.message}</p>
          </div>
        ))}

        {rows.length === 0 && (
          <p className="p-8 text-center text-charcoal-500 bg-white rounded-2xl border border-charcoal-100">
            No messages yet.
          </p>
        )}
      </div>
    </div>
  )
}
