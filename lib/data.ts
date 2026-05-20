import { unstable_noStore as noStore } from 'next/cache';
import { mockCoupleGallery, mockGifts, mockHoneymoon, mockStoryMoments } from '@/lib/mock-data';
import { createAdminClient } from '@/lib/supabase/server';
import { percentage } from '@/lib/utils';

export async function getLandingData() {
  noStore();
  const gifts = (await getGifts()).slice(0, 4);
  return {
    gallery: mockCoupleGallery,
    gifts,
    honeymoon: {
      ...mockHoneymoon,
      progress: percentage(mockHoneymoon.collectedCents, mockHoneymoon.targetCents),
    },
    story: mockStoryMoments,
  };
}

export async function getGifts() {
  noStore();
  const supabase = await createAdminClient();

  if (!supabase) {
    return mockGifts.map((gift) => ({
      ...gift,
      progress: percentage(gift.collectedCents, gift.priceCents),
      remainingCents: Math.max(gift.priceCents - gift.collectedCents, 0),
    }));
  }

  const { data } = await supabase
    .from('gifts')
    .select('id, slug, title, description, image_url, price_cents, collected_amount_cents, allow_shared, status, gift_contributions(status, amount_cents, guests(name))')
    .order('sort_order');

  return (data ?? []).map((gift: any) => {
    const participants = (gift.gift_contributions ?? [])
      .filter((item: any) => item.status === 'paid')
      .map((item: any) => item.guests?.name)
      .filter(Boolean);

    return {
      id: gift.id,
      slug: gift.slug,
      title: gift.title,
      description: gift.description,
      imageUrl: gift.image_url,
      priceCents: gift.price_cents,
      collectedCents: gift.collected_amount_cents ?? 0,
      allowShared: gift.allow_shared,
      status: gift.status,
      participants,
      progress: percentage(gift.collected_amount_cents ?? 0, gift.price_cents),
      remainingCents: Math.max(gift.price_cents - (gift.collected_amount_cents ?? 0), 0),
    };
  });
}

export async function getGiftBySlug(slug: string) {
  const gifts = await getGifts();
  return gifts.find((gift) => gift.slug === slug) ?? null;
}

export async function getHoneymoonStatus() {
  noStore();
  const supabase = await createAdminClient();

  if (!supabase) {
    return {
      ...mockHoneymoon,
      remainingQuotas: mockHoneymoon.totalQuotas - mockHoneymoon.soldQuotas,
      progress: percentage(mockHoneymoon.collectedCents, mockHoneymoon.targetCents),
    };
  }

  const { data } = await supabase
    .from('honeymoon_quotas')
    .select('id, quota_number, price_cents, status, guests(name)')
    .order('quota_number');

  const sold = (data ?? []).filter((item: any) => item.status === 'paid');
  const collectedCents = sold.reduce((sum: number, item: any) => sum + (item.price_cents ?? 0), 0);

  return {
    title: 'Ajude nossa lua de mel na Argentina',
    targetCents: 1000000,
    collectedCents,
    totalQuotas: 100,
    soldQuotas: sold.length,
    remainingQuotas: 100 - sold.length,
    contributors: sold.map((item: any) => item.guests?.name).filter(Boolean),
    progress: percentage(collectedCents, 1000000),
  };
}

export async function getAdminMetrics() {
  noStore();
  const supabase = await createAdminClient();

  if (!supabase) {
    return {
      revenueCents: mockGifts.reduce((sum, gift) => sum + gift.collectedCents, 0) + mockHoneymoon.collectedCents,
      guests: 128,
      pendingPayments: 6,
      confirmedRsvps: 74,
      giftsCompleted: mockGifts.filter((gift) => gift.status === 'completed').length,
    };
  }

  const [{ count: guests }, { count: pendingPayments }, { count: confirmedRsvps }, { data: payments }, { count: giftsCompleted }] = await Promise.all([
    supabase.from('guests').select('*', { count: 'exact', head: true }),
    supabase.from('payments').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('rsvps').select('*', { count: 'exact', head: true }).eq('attendance_status', 'confirmed'),
    supabase.from('payments').select('amount_cents').eq('status', 'approved'),
    supabase.from('gifts').select('*', { count: 'exact', head: true }).eq('status', 'completed'),
  ]);

  return {
    revenueCents: (payments ?? []).reduce((sum: number, item: any) => sum + item.amount_cents, 0),
    guests: guests ?? 0,
    pendingPayments: pendingPayments ?? 0,
    confirmedRsvps: confirmedRsvps ?? 0,
    giftsCompleted: giftsCompleted ?? 0,
  };
}

export async function getStoryMoments() {
  return mockStoryMoments;
}

export async function getCoupleGallery() {
  return mockCoupleGallery;
}
