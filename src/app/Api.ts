export type SuccessResponse<T> = {
    readonly status: 'success';
    readonly result: T;
}

export type ErrorResponse = {
    readonly status: 'error';
    readonly errors: {
        readonly key: string;
    }
}

export class Api {
    public constructor(private readonly baseUrl: string) {

    }

    public async POST<T>(url: string, payload?: Record<string, any>): Promise<T> {
        let body: string | undefined = undefined;
    
        if (payload) {
          body = JSON.stringify(payload);
        }
        
        const response = await fetch(`${this.baseUrl}/${url}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body,
        });


        if (response.ok) {
            try {
                const rawResponse = await response.json() as (SuccessResponse<T> | ErrorResponse);
                
                if (rawResponse.status === 'success') {
                    return rawResponse.result;
                }else {
                    throw new Error(rawResponse.errors.key)
                }
            } catch (exception) {
                throw new Error('Unable read response!')
            }
        }

        throw new Error('Unknown server error!')
    }
}