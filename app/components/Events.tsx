import React from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import Event from './Event';
import { useQuery } from '@tanstack/react-query';
import { getAllEvents } from '../api/event';
import { useSession } from '../hooks/Session';


export default function Events() {
    const { user_id, isLoading } = useSession()
    const eventsData = useQuery({
        queryKey: ['events'],
        queryFn: async () => {
            let events = await getAllEvents(user_id)
            return events
        },
        enabled: !isLoading
    })
    if (eventsData.data === undefined || eventsData.isError) {
        // setError({
        //     error: true,
        //     refetch: eventsData.refetch
        // })
        return null
    }
    if (eventsData.isLoading) return <ActivityIndicator />
    if (isLoading) return <ActivityIndicator />

    return (
        <>
            {eventsData.data.success && <FlatList data={eventsData.data.data}
                horizontal
                keyExtractor={key => key.event_id.toString()}
                style={{}}
                renderItem={({ item }) => (
                    <Event
                        name={item.event_name}
                        deadline={`Upto: ${item.deadline}`}
                        description={item.event_desc}
                        accepted={item.accepted}
                        event_id={Number(item.event_id)}
                    />
                )}
            />}
        </>
    );
};
