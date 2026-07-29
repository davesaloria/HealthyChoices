import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    // Create order
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          user_id: body.userId,
          status: 'pending',
          total_price: body.total,
          delivery_type: body.deliveryType,
          delivery_address: body.deliveryAddress,
          scheduled_time: body.scheduledTime,
        },
      ])
      .select()

    if (error) throw error

    return NextResponse.json(data[0])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}

export async function GET(_request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.from('orders').select('*')

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}
